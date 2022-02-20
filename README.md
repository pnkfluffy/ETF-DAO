DartMonkey - ETF DAO

Core Idea
Diversification is a core piece of investing. Traditional finance has mutual funds, exchange traded funds, money markets and other simple ways for investors to directly participate in a basket of assets. These systems reduce systematic risk for investors in easily accessible ways. Anybody can simply buy an ETF like SPY or VOO, and they're then immediately exposed to the price movement of 100s of different stocks. Similar instruments are available for practically any facet of traditional finances. Unfortunately that isn't the case in DeFi. While the emphasis on "do your own research" is incredibly valuable, it's an obstacle which prevents busier people from joining - a single token can take hours to days to research, meaning diversification is completely out of reach. An ETF equivalent for DeFi removes this barrier, and can be done through smart contracts - meaning no fee paid to a money manager. ERC20, NFTs, crypto, DAOs can all be managed through decentralized pools, allowing quick and easy access.

Our Implementation
As part of this hackathon, we've created a pair of contracts and UI that facilitate the creation of ERC20 ETFs. Anybody can specify any grouping of tokens and quantities, and use the ETF Factory contract to create a Fund. Anybody can then interact directly with the Fund to be exposed to the price changes in the group of ERC20 tokens.

For example somebody can create a Fund with 5 LINK, 10 SHIB, and 20 LOOT. Then anybody else can interact with the Fund, joining it and buying Fund tokens. The price of joining is exactly equal to the current price of the underlying assets multiplied by the number of fund tokens that they want to buy. Then when they want to exit the fund, they can interact with the contract and receive the current value of the underlying assets. This is incredibly powerful, as it means that the new Fund tokens are worth exactly what the underlying tokens are worth - instead of the three tokens in this example, the Fund could have 500 (or infinite) underlying tokens, and the ease of joining is exactly the same.

On top of this, the Fund itself is an ERC20, meaning it can be traded in the exact same way. If somebody wanted to, they could make a Fund of Funds, furthering the ease of diversification. Since they're ERC20s, Funds can also be traded themselves on an exchange, exactly as the traditional finance ETFs do, meaning people could still access them without having to interact directly with the Fund contracts.

Technology
A key bottleneck here is the sheer number of swaps that need to happen to create or redeem the Fund token. Because of this we need a gas reducing solution. Polygon works perfectly for this. Using their side chain vastly reduces the cost of purchasing and selling the underlying assets. Alongside this, the ability to trade the funds on any dex means that - once created - people can freely buy and sell the Fund without having to use the relatively costly join or exit functions.

A second bottleneck is that the current implementation relies on a static set of assets. This works well, but fails to capture the value found in actively managed funds. The best way of allowing active management of a fund in a decentralized manner is to implement a DAO. DXdao allows for on-chain management of created Funds. Communities can be built around Funds, and carrots can be tied to fund KPIs as a way to reward particularly profitable Fund trades, incentivizing deeper research.

Use Cases
ETFs are such fundamental asset classes that they can be used in practically any way:
- Influencers wishing to allow investors to invest using their strategy. Fees can be tied to this, or DXdao's carrots can be used as rewards for well-managed funds.
- Companies wishing to build investing arms and offer their token for governance
- Communities wishing to invest together and participate in discovery and risk reduction together
- Varying applications where funds may be focused on the market as a whole or s≠pecific industries and asset types. NFT funds, ERC20 funds, tokenized stock funds, etc.

