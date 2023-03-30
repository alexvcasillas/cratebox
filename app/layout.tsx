export const metadata = {
  title: "Cratebox.io",
  description:
    "Cratebox is a fast, global content delivery network for everything on npm. Use it to quickly and easily load any file from any package using a URL",
};

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900">{children}</body>
    </html>
  );
}
