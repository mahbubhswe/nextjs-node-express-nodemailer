import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  // const Layout = Component.Layout || NoLayout;
  return <Component {...pageProps} />;
}
// const NoLayout = ({ children }) => <>{children}</>;
export default MyApp;
