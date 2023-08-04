import type { NextSeoProps } from "next-seo";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { baseUrl } from "@/lib/constants";
import Footer from "./Footer";

type ContainerProps = NextSeoProps & {
  children: ReactNode;
};
export default function Container({ children, ...props }: ContainerProps) {
  const router = useRouter();
  const {
    title,
    description = "Giải pháp hoàn hảo cho mọi nhu cầu giao hàng của bạn",
  } = props;

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={`%s | ${process.env.NEXT_PUBLIC_APP_NAME}`}
        defaultTitle={process.env.NEXT_PUBLIC_APP_NAME}
        description={description}
        canonical={`${baseUrl}${router.asPath}`}
        openGraph={{
          url: `${baseUrl}${router.asPath}`,
          type: "website",
          site_name: process.env.NEXT_PUBLIC_APP_NAME,
          description,
          title: title || process.env.NEXT_PUBLIC_APP_NAME,
          images: [
            {
              url: `${baseUrl}/static/images/metacrew-banner.png`,
              height: 627,
              width: 1200,
              alt: title || process.env.NEXT_PUBLIC_APP_NAME,
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@Metacrew",
        }}
      />
      {children}
      <Footer />
    </>
  );
}
