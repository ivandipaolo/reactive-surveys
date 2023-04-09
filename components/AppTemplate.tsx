import React, { ReactNode } from 'react';
import { Layout, theme } from 'antd';
import Image from 'next/image'
import logo from "@/public/logo.svg"
import { ConnectMetaMask } from '@/components/ConnectMetaMask';
import { useWalletConnection } from '@/hooks/useWalletConnection';
import Link from 'next/link'

const { Header, Content } = Layout;

  type TemplateProps = {
    children: ReactNode
  }

const ConnectedTemplate = ({children}: TemplateProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const {
    active
  } = useWalletConnection();
  return (
    <Layout className="site-layout">
      <Header className='px-3 lg:px-10 py-2 lg:py-4 flex flex-row h-fit justify-between bg-teal-600'>
          <div className="flex text-md lg:text-2xl text-white items-center justify-center">
            <Link href="/" className='flex flex-col items-center justify-center lg:flex-row'>
                <p className="font-semibold text-center text-base w-20 lg:text-3xl lg:w-fit">Reactive Surveys</p>
                <Image className="p-2" width="45" height="45" src={logo} alt="logo"/>
            </Link>
          </div>
        <ConnectMetaMask/>
      </Header>
      <Content className="m-4">
        <div className={`lg:px-4 min-h-[360px] bg-${colorBgContainer}`}>
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default ConnectedTemplate;
