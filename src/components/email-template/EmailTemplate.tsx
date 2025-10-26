import React from "react";

export function ReminderEmail({
  name,
  actionUrl,
  unsubscribeUrl,
}: {
  name?: string | null;
  actionUrl: string;
  unsubscribeUrl: string;
}) {
  const userName = name && name.trim().length > 0 ? name : "there";
  return (
    <html>
      <body
        style={{
          fontFamily:
            "Roboto, ui-sans-serif, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
          margin: 0,
          padding: "24px",
        }}
      >
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          role="presentation"
          style={{
            maxWidth: 560,
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(127,29,29,0.1)",
          }}
        >
          <tbody>
            <tr>
              <td style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ display: "inline-block" }}
                    aria-hidden="true"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <h1
                    style={{
                      fontSize: 20,
                      margin: 0,
                      color: "#ef4444",
                    }}
                  >
                    Don’t break the chain!
                  </h1>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "#4b5563",
                    lineHeight: 1.6,
                    margin: 0,
                    marginBottom: 16,
                  }}
                >
                  Hi {userName},
                  <br />
                  <br />
                  This is your friendly nudge from Chain Log. Keep your streak
                  alive — log today and keep the momentum going.
                  <br />
                  <br />
                  <span style={{ color: "#ef4444" }}>
                    Consistency is your advantage.
                  </span>
                </p>
                <p style={{ margin: 0, marginTop: 20 }}>
                  <a
                    href={actionUrl}
                    style={{
                      display: "inline-block",
                      background: "#ef4444",
                      color: "#ffffff",
                      padding: "10px 16px",
                      borderRadius: 6,
                      fontSize: 14,
                      textDecoration: "none",
                    }}
                  >
                    Add today’s log
                  </a>
                </p>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "16px 24px",
                  borderTop: "1px solid #ef4444",
                }}
              >
                <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>
                  You’re receiving this because you enabled daily reminders in
                  Chain Log.
                  <br />
                  <a
                    href={unsubscribeUrl}
                    style={{ color: "#ef4444", textDecoration: "underline" }}
                  >
                    Unsubscribe
                  </a>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "#4b5563",
            marginTop: 16,
          }}
        >
          © {new Date().getFullYear()} Chain Log
        </p>
      </body>
    </html>
  );
}
