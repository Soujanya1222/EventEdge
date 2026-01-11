import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyQR } from "../../slices/ticketSlice";

export default function ScanQR() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Lazy load Html5QrcodeScanner to avoid SSR issues
    import("html5-qrcode").then(({ Html5QrcodeScanner }) => {
      const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);

      scanner.render(
        (decodedText) => {
          console.log("QR scanned:", decodedText);
          // Dispatch Redux action to verify QR
          dispatch(verifyQR(decodedText));
        },
        (errorMessage) => {
          console.warn("QR scan error:", errorMessage);
        }
      );

      // Cleanup
      return () => scanner.clear();
    });
  }, [dispatch]);

  return (
    <div>
      <h2>Scan QR Code</h2>
      <div id="reader" style={{ width: "500px" }} />
    </div>
  );
}
