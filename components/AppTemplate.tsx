import React, { ReactNode } from 'react';
import { Layout, theme } from 'antd';
import Image from 'next/image'
import logo from "@/public/logo.svg"
import { ConnectMetaMask } from '@/components/ConnectMetaMask';
import { useWalletConnection } from '@/hooks/useWalletConnection';

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
      {
        active && 
        <Header className='flex flex-row h-fit p-4 justify-between bg-teal-500'>
          <div className="flex flex-row text-2xl text-white items-center justify-center ">
            <p className="font-semibold">Reactive Surveys</p>
            <Image className="p-2" width="45" height="45" src={logo} alt="logo"/>
          </div>
          <ConnectMetaMask/>
        </Header>
      }
      <Content className="m-4">
        <div className={`px-4 min-h-[360px] bg-${colorBgContainer}`}>
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default ConnectedTemplate;
