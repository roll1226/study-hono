import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <header>ヘッダー部分</header>
      <body>{children}</body>
      <footer>フッター部分</footer>
    </html>
  );
});
