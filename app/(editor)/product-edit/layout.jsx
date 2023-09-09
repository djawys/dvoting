export default function EditorLayout({ children }) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">
      {children}
    </div>
  );
}