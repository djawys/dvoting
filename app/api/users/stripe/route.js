import { getServerSession } from 'next-auth/next';
import { z } from 'zod';

import { proPlan } from '@/lib/stripe/subscription-plan';
import { authOptions } from '@/lib/auth';
import { stripe } from '@/lib/stripe/stripe';
import { getUserSubscriptionPlan } from '@/lib/stripe/subscription';
import { absoluteUrl } from '@/lib/utils';

const billingUrl = absoluteUrl('/dashboard/billing');

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session?.user.cnic) {
      return new Response(null, { status: 403 });
    }

    const subscriptionPlan = await getUserSubscriptionPlan(session.user.id);
    // The user is on the pro plan.
    // Create a portal session to manage subscription.
    if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      });

      return new Response(JSON.stringify({ url: stripeSession.url }));
    }

    // The user is on the free plan.
    // Create a checkout session to upgrade.
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: session.user.cnic,
      line_items: [
        {
          price: proPlan.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
      },
    });
    return new Response(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
