import "./globals.css";

export const metadata = {
  title: "Andre Floquet Website",
  description: "This is my personal website. Enjoy it :)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
