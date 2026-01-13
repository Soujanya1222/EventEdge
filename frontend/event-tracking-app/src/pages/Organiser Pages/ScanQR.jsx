import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { verifyQR } from "../../slices/ticketSlice";
import "../../styles/scanQr.css";

export default function ScanQR() {
  const dispatch = useDispatch();

  const qrRef = useRef(null);
  const isRunningRef = useRef(false);

  const [status, setStatus] = useState(null); 
  const [message, setMessage] = useState("");

  
  const playSuccessSound = () => {
    const audio = new Audio("/success.mp3");
    audio.play().catch(() => {});
  };

  const vibratePhone = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(200);
    }
  };

  useEffect(() => {
    let active = true;

    import("html5-qrcode").then(({ Html5Qrcode }) => {
      if (!active) return;

      qrRef.current = new Html5Qrcode("reader");

      qrRef.current
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },

          (decodedText) => {
            if (!isRunningRef.current) return;

            dispatch(verifyQR(decodedText))
              .unwrap()
              .then((res) => {
                setStatus(res.status);
                setMessage(res.message);

                if (res.status === "success") {
                  playSuccessSound();
                  vibratePhone();
                }
              })
              .catch((err) => {
                setStatus(err.status || "invalid");
                setMessage(err.message || "Invalid ticket");
              })
              .finally(() => {
                if (qrRef.current && isRunningRef.current) {
                  isRunningRef.current = false;
                  qrRef.current
                    .stop()
                    .then(() => qrRef.current.clear())
                    .catch(() => {});
                }
              });
          },

         
          () => {}
        )
        .then(() => {
          isRunningRef.current = true;
        });
    });

    return () => {
      active = false;
      if (qrRef.current && isRunningRef.current) {
        isRunningRef.current = false;
        qrRef.current.stop().catch(() => {});
      }
    };
  }, [dispatch]);

  return (
    <div className="scan-container">
      <h2>Scan QR Code</h2>

      {!status && <div id="reader" />}

      {status === "success" && (
        <div className="success-box">
          <div className="checkmark">✓</div>
          <h3>Ticket Verified</h3>
          <p>Entry Approved</p>
        </div>
      )}

      {status === "expired" && (
        <div className="error-box expired">
          <h3> Ticket Expired</h3>
          <p>{message}</p>
        </div>
      )}

      {status === "invalid" && (
        <div className="error-box invalid">
          <h3> Invalid Ticket</h3>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
