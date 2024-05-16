'use client'
import './css/globals.css'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { getCookie } from 'cookies-next';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

interface ContextProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  authenticated: boolean;
  jwtToken: string | null;
}

const AppContext = createContext<ContextProps>({
  sidebarOpen: false,
  setSidebarOpen: (): boolean => false,
  authenticated: false,
  jwtToken: null
})

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {  

  const config = getDefaultConfig({
    appName: 'testhkton',
    projectId: 'e2b4d0b3cd8b2508b3b519ff74cf580b',
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });
  const queryClient = new QueryClient();
  const customTheme = {
    colors: {
      accentColor: '#6366f1',
      accentColorForeground: 'hsl(225, 0%, 0%)',
      actionButtonBorder: '#6366f1',
      actionButtonBorderMobile: '#6366f1',
      actionButtonSecondaryBackground: 'hsl(225, 0%, 0%)',
      closeButton: 'hsl(226, 11%, 64%)',
      closeButtonBackground: 'hsl(228, 5%, 18%)',
      connectButtonBackground: '#6366f1', //'#0f172a'
      connectButtonBackgroundError: 'hsl(360,100%,64%)',
      connectButtonInnerBackground: '#6366f1', //'#0f172a'
      connectButtonText: '#ffffff',
      connectButtonTextError: 'hsl(0,0%,100%)',
      error: 'hsl(0,0%,100%)',
      generalBorder: 'hsl(228, 5%, 18%)',
      generalBorderDim: 'rgba(0, 0, 0, 0.03)',
      menuItemBackground: 'hsl(229, 9%, 20%)',
      modalBackdrop: 'rgba(0, 0, 0, 0.5)',
      modalBackground: 'hsl(228, 9%, 11%)',
      modalBorder: '#6366f1',
      modalText: '#ffffff',
      modalTextDim: 'rgba(60, 66, 66, 0.3)',
      modalTextSecondary: 'hsl(0, 0%, 60%)',
      profileAction: '#6366f1',
      profileActionHover: '#332a00',
      profileForeground: 'hsl(220, 8%, 15%)',
      selectedOptionBorder: '#6366f1',
      downloadBottomCardBackground: 'linear-gradient(126deg, rgba(0, 0, 0, 0) 9.49%, rgba(120, 120, 120, 0.1) 71.04%), #050505',
      downloadTopCardBackground: 'linear-gradient(126deg, rgba(120, 120, 120, 0.1) 9.49%, rgba(0, 0, 0, 0) 71.04%), #050505',
      connectionIndicator: 'hsl(107, 100%, 44%)',
      standby: 'hsl(47, 100%, 63%)',
    },
    radii: {
      actionButton: '6px',
      connectButton: '3px',
      menuButton: '3px',
      modal: '6px',
      modalMobile: '6px',
    },
    shadows: {
      connectButton: '0px 8px 32px rgba(0, 0, 0, 0.32)',
      dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
      profileDetailsAction: '0px 2px 6px rgba(37, 41, 46, 0.04)',
      selectedOption: '0px 2px 6px rgba(0, 0, 0, 0.24)',
      selectedWallet: '0px 2px 6px rgba(0, 0, 0, 0.12)',
      walletLogo: '0px 2px 16px rgba(0, 0, 0, 0.16)',
    },
    blurs: {
      modalOverlay: 'blur(0px)', // e.g. 'blur(4px)'
    },
    fonts: {
      body: '...', // default
    },
  }

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [jwtToken, setJwtToken] = useState<string | null>(null)

  useEffect(() => {
    const jwtCookie = getCookie('jwt');
    if (jwtCookie) {
      try {
        const userData = verifyJwt(jwtCookie); // Implement your JWT verification logic here
        setAuthenticated(userData);
        setJwtToken(jwtCookie);
      } catch (error) {
        // Handle invalid JWT or errors
        console.error(error);
      }
    }
  }, []);

  function verifyJwt(jw:string){
    return true
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>
          <AppContext.Provider value={{ sidebarOpen, setSidebarOpen, authenticated, jwtToken }}>
            {children}
          </AppContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export const useAppProvider = () => useContext(AppContext)