import styled from "@emotion/styled";
import { UmaConnectButton, useOAuth } from "@uma-sdk/uma-auth-client";
import { usePayToAddress } from "./components/usePayToAddress";

function App() {
  const requiredCommands = ["pay_to_address"];
  const optionalCommands: string[] = [];
  const { nwcConnectionUri } = useOAuth();

  return (
    <Main>
      <ButtonContainer>
        <UmaConnectButton
          app-identity-pubkey={"npub1scmpzl2ehnrtnhu289d9rfrwprau9z6ka0pmuhz6czj2ae5rpuhs2l4j9d"}
          nostr-relay={"wss://nos.lol"}
          redirect-uri={"http://localhost:3001"}
          required-commands={requiredCommands}
          optional-commands={optionalCommands}
          budget-amount={"10"}
          budget-currency={"USD"}
          budget-period={"weekly"}
        />
      </ButtonContainer>
    </Main>
  );
}

const Main = styled.main`
  position: relative;
  height: 100vh;
  width: 100vw;
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
`;

export default App;
