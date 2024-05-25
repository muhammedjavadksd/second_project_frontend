import Script from "next/script";
import './global.css'
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link rel="stylesheet" href={`${process.env.CSS_PATH}/style.css`}></link>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Raleway:ital,wght@0,100..900;1,100..900&family=Sedan+SC&display=swap" rel="stylesheet" />
      
      <body>
        <ToastContainer>  </ToastContainer>
        {children}
      </body>


      <script src="https://cdn.tailwindcss.com"></script>

      <Script src="https://kit.fontawesome.com/046dc73391.js" crossorigin="anonymous"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></Script>

    </html>
  );
}
