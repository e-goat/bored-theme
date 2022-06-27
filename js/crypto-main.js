export default class Cryptomarket {
    _init;
    _output;
    _newCount;
    _coinsID;
    _ajaxCallObj;
    _coinMeta;
    _allCoinsArray;

    constructor() {
        this._output        = null;
        this._newCount      = null;
        this._coinsID       = [];
        this._ajaxCallObj   = {};
        this._coinMeta      = [];
        this._allCoinsArray = [];
    }

    //Sort array by rank
    sortByRank = (array, key) => {
        return array.sort((a, b) => {
            let x = a[key], 
                y = b[key];

            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    getData = () => {
        return fetch('https://api.coingecko.com/api/v3/coins/')
            .then( response => response.json() )
            .then( (data) => {
                let coinsLength = data.length;
                return [...Array(coinsLength)].forEach((_, index) => {
                    this._coinsID.push( data[index].id );
                })
            } ).then( () => { 
                this.getPrices();
            } );
    }   

    //API call/s depending on the ammount of coin names set in coinID array. 
    //Upon success, ajax is building independent object called coinMeta.
    getPrices = () => {
        let newCount = 0;

        this._coinsID.forEach(id => {
            fetch (`https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true&days=1`)
                .then(response => response.json())
                .then( (coinData) => {
                    for (var i=0; i < coinData.tickers.length; i++){
                        if ( coinData.market_cap_rank !== null && coinData.tickers[i].target == 'USD') {
                            newCount++;
                            this._coinMeta.push({
                                rank:           coinData.market_cap_rank,
                                name:           coinData.name,
                                logo:           coinData.image.thumb,
                                trade_on:       coinData.tickers[i].trade_url,
                                vs_currency:    coinData.tickers[i].target,
                                price:          coinData.tickers[i].last,
                                creationDate:   coinData.genesis_date,
                                ex_name:        coinData.tickers[i].market.name,
                                total_supply:   coinData.circulating_supply
                            });                    
                            break;
                        }   
                    }
                })
                .then( () => {
                    let output;
                    this._allCoinsArray.push(this._coinMeta);
                    this.sortByRank(this._allCoinsArray[0],"rank");

                    for (var eachCoin = 0; eachCoin < newCount; eachCoin++){
                        if (this._allCoinsArray[0][eachCoin] != undefined) {
                            let rank        = this._allCoinsArray[0][eachCoin].rank,
                                name        = this._allCoinsArray[0][eachCoin].name,
                                price       = this._allCoinsArray[0][eachCoin].price,
                                logo        = this._allCoinsArray[0][eachCoin].logo,
                                origin_date = this._allCoinsArray[0][eachCoin].creationDate,
                                currency    = this._allCoinsArray[0][eachCoin].vs_currency,
                                trade_on    = this._allCoinsArray[0][eachCoin].trade_on,
                                exchange    = this._allCoinsArray[0][eachCoin].ex_name;
                            output += 
                            `<tr class="coin-row">
                                <th scope="row" class="table-dark rank">${rank}</th>
                                <th scope="row" class="table-dark name-${name}" value="name"><img src="${logo}" class="coin-icon"/> ${name}</th>
                                <th scope="row" class="table-dark price">${currency} ${price}</th>
                                <th scope="row" class="table-dark creation-date">${origin_date != null ? origin_date : "N/A" }</th>
                                <th scope="row" class="table-dark trade-on">
                                    <a href="${trade_on}" class="button" target="_blank">Trade on ${exchange}</a>
                                </th>
                            </tr>`; 
                        }
                    }
                    return document.getElementsByClassName( "price-list" )[0].innerHTML = output;
                });
        });
    }

    init = () => {
        this.getData();
    }
}