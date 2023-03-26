import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  // bu yaklaşım yerine getServerSideProps kullandık. Çünkü bu yaklaşımı kullandığımızda
  // her defasında anlık Loaading... duurmu ekranda gözüküyor. Bunun nedeni de session kontrolünün client'da yapılması
  // ve cevabın gelmesinin biraz zaman alması. getServerSideProps ile bu kontrol server tarafında yapıyor ve durma göre sayfayı render ediyor.
  /* const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  } */

  return <AuthForm />;
}

// bu sayfaya istek atıldığında session kontrolü yapılıyor.
// session varsa login sayfası gösterilmiyor. Ana sayfaya yönelendiriliyor.
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default AuthPage;
