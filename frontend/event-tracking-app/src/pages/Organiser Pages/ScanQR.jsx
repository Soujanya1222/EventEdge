import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { verifyQR } from "../../slices/ticketSlice";
import "../../styles/scanQr.css";

export default function ScanQR() {
  const dispatch = useDispatch();

  const qrRef = useRef(null);
  const audioCtxRef = useRef(null);

  const isRunningRef = useRef(false);
  const isProcessingRef = useRef(false);
  const errorShownRef = useRef(false);

  const lastScanRef = useRef({
    text: null,
    time: 0
  });

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const playSuccessSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = 880;

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (err) {
      console.error("Sound error:", err);
    }
  };

  const vibratePhone = () => {
    if ("vibrate" in navigator) navigator.vibrate(200);
  };

  useEffect(() => {
    let mounted = true;

    const startScanner = async () => {
      const { Html5Qrcode } = await import("html5-qrcode");
      if (!mounted) return;

      qrRef.current = new Html5Qrcode("reader");

      await qrRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        onScanSuccess,
        () => {}
      );

      isRunningRef.current = true;
    };

    const onScanSuccess = (decodedText) => {
      if (!isRunningRef.current || isProcessingRef.current) return;

      const now = Date.now();
      if (
        decodedText === lastScanRef.current.text &&
        now - lastScanRef.current.time < 3000
      ) {
        return;
      }

      isProcessingRef.current = true;
      lastScanRef.current = { text: decodedText, time: now };

      dispatch(verifyQR(decodedText))
        .unwrap()
        .then((res) => {
          setStatus(res.status);
          setMessage(res.message);

          if (res.status === "success") {
            playSuccessSound();
            vibratePhone();

            qrRef.current?.stop().catch(() => {});
            isRunningRef.current = false;
          }
        })
        .catch((err) => {
          if (errorShownRef.current) return;

          errorShownRef.current = true;
          setStatus(err.status || "invalid");
          setMessage(err.message || "Invalid ticket");

          qrRef.current?.stop().catch(() => {});
          isRunningRef.current = false;

          setTimeout(() => {
            resetScanner();
          }, 2000);
        })
        .finally(() => {
          setTimeout(() => {
            isProcessingRef.current = false;
          }, 800);
        });
    };

    const resetScanner = async () => {
      errorShownRef.current = false;
      lastScanRef.current = { text: null, time: 0 };
      setStatus(null);
      setMessage("");

      if (!qrRef.current) return;

      await qrRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        onScanSuccess,
        () => {}
      );

      isRunningRef.current = true;
    };

    startScanner().catch(console.error);

    return () => {
      mounted = false;
      isRunningRef.current = false;
      qrRef.current?.stop().catch(() => {});
    };
  }, [dispatch]);

  return (
    <div className="scan-container">
      <h2>Scan QR Code</h2>

      <div id="reader" />

      {status === "success" && (
        <div className="success-box">
          <div className="checkmark">✓</div>
          <h3>Ticket Verified</h3>
          <p>Entry Approved</p>
        </div>
      )}

      {status === "expired" && (
        <div className="error-box expired">
          <h3>Ticket Expired</h3>
          <p>{message}</p>
        </div>
      )}

      {status === "invalid" && (
        <div className="error-box invalid">
          <h3>Invalid Ticket</h3>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
