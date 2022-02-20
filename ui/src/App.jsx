import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { UseWalletProvider } from "use-wallet";
import { Trade } from "./views/Trade/Trade";
import { Create } from "./views/Create/Create";
import BaseView from './views/BaseView'

const App = () => {
  return (
    <Providers>
      <StyledCanvas>
        <Router>
          <Switch>
            <BaseView>
              <Route exact path="/">
                <Trade />
              </Route>
              <Route exact path="/create">
                <Create />
              </Route>
            </BaseView>
          </Switch>
        </Router>
      </StyledCanvas>
    </Providers>
      );
};

      const Providers = ({children}) => {
  return (
      <UseWalletProvider
        chainId={4}
        connectors={{
          walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
        }}
      >
        {children}
      </UseWalletProvider>
      );
};

      const StyledCanvas = styled.div`
      position: absolute;
      width: 100%;
      height: 100%;
      background: #24242c;
      `;

      export default App;
