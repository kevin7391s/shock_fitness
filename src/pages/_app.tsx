// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@/context/userContext"; // add this import

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default App;
