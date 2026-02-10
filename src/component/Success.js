import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    console.log("Payment successful, session:", sessionId);

    // OPTIONAL: call backend to verify payment using sessionId
  }, [sessionId]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎉Order Placed Successful!</h1>
      <p>Thank you for your order.</p>
    </div>
  );
};

export default Success;
