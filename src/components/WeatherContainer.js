import React, {useState, useEffect} from 'react'
import styled from 'styled-components'


const api = {
    key: "52ba6152605f8da629ba1609326e6b5c",
    base: "https://api.openweathermap.org/data/2.5/"

}


export default function WeatherContainer() {

    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});


    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}&lang=es`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setQuery("");
                console.log(result);
            });
        }
    }
    


function cambiarCiudad(ciudad){

    fetch(`${api.base}weather?q=${ciudad}&units=metric&APPID=${api.key}&lang=es`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setQuery("");
                console.log(result);
            });
        
    }

    window.onload = () => cambiarCiudad("london");

    return (
        
        <ContainerFull>
           
            <BackgroundImg src={(typeof weather.main != "undefined") ? (`https://source.unsplash.com/1920x1080/?${weather.name}+landscape`) : (`https://source.unsplash.com/1920x1080/?desert`)} />
            <ContainerApp >
                
                <Content>
                    <div className="info-left">
                         <h2>weather.app</h2>
                         {(typeof weather.main != "undefined") ? (
                         <div className="info-left__container">
                            <h1 className="info-left__tempe">{weather.main.temp.toFixed(1)}C°</h1>
                            <div className="info-left__name">
                                <h2>{weather.name}, {weather.sys.country}</h2>
                                <p>{weather.weather[0].description}</p>
                            </div>
                         </div>
                         ) : (<div><h1>404 <span>Not found</span></h1></div>)}
                    </div>
                    <div className="info-right">
                        <div className="info-right__container">
                             <input type="text" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} placeholder='Buscar ciudad'></input>
                             <button onClick={() => cambiarCiudad(query)}><img src="search.svg"></img></button>
                        </div>
                        <div className="citylist">
                            <a onClick={() => cambiarCiudad("london")}>Londres</a>
                            <a onClick={() => cambiarCiudad("los angeles")}>Los Angeles</a>
                            <a onClick={() => cambiarCiudad("buenos aires")}>Buenos Aires</a>
                            <a onClick={() => cambiarCiudad("hong kong")}>Hong Kong</a>
                        </div>

                        {(typeof weather.main != "undefined") ? (
                    <div className="container_details">
                        <h2>Detalles del clima</h2>
                            <div>
                                <p>Sensasión térmica</p>
                                <span>{weather.main.feels_like}°C</span>
                            </div>
                            <div>
                                <p>Viento</p>
                                <span>{weather.wind.speed}km/h</span>
                            </div>
                            <div>
                                <p>Humedad</p>
                                <span>{weather.main.humidity}%</span>
                            </div>
                            <div>
                                <p>Min/Máx</p>
                                <span>{weather.main.temp_min}°C | {weather.main.temp_max} °C</span>
                            </div>
                    </div>
                    ) : ("")}
                    </div>
                </Content>
                
            </ContainerApp>
            
        </ContainerFull>
    )

    
}



const ContainerFull = styled.div`
width:100vw;
height:100vh;
display:flex;
align-items:center;
justify-content:center;


@media (max-width: 450px) {
    width:100vw;
    height:100vh;
    
  }
`

const BackgroundImg = styled.img`
position:absolute;
z-index:-1;
width:100%;
height:100%;
margin:0;
padding:0;
object-fit:cover;
`

const ContainerApp = styled.div`
border: 6px solid #FFFFFF;
box-sizing: border-box;
box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
border-radius: 18px;
height:847px;
width:1596px;


@media (max-width: 450px) {
    width:100vw;
    height:100vh;
    overflow-x:hidden;
    border: none;
    
  }

`

const Content = styled.div`
color:white;
font-size:32px;
display:flex;
height:100%;
padding:100px 100px;
box-sizing: border-box;
font-family:"Poppins";
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

@media (max-width: 450px) {
    padding: 30px 30px;
    flex-direction:column;
    align-items:center;
    gap: 20px;
    justify-content:center;
  }


.info-right{
    width:500px;
    height:590px;
    background: rgba( 0, 0, 0, 0.35 );
    backdrop-filter: blur( 8px );
    -webkit-backdrop-filter: blur( 8px );
    border-radius: 10px;

    @media (max-width: 450px) {
            width:100%;
            height:100%;
        }

    &__container{
        padding:40px 40px;
        padding-bottom:20px;
        display:flex;

        @media (max-width: 450px) {
            padding: 20px 40px;
          }

        input{
            background-color:transparent;
            color:white;
            border:none;
            border-bottom:2px solid rgb(255,255,255,0.5);
            font-size:14px;
            font-family:"Poppins";
            width:90%;

            &::placeholder{
                color:rgb(255,255,255,0.5);
            }

            &:focus{
                outline: none;
            }
            }

        button{
            cursor:pointer;
            background-color:rgb(255,255,255,0.5);
            border:none;
            height:42px;
            width:42px;
        }
        }

    .citylist{
        display:flex;
        flex-direction:column;
        padding-left:40px;
        padding-right:40px;

        a{
            font-size:14px;
            font-family:"Poppins";
            color:rgb(255,255,255,0.5);
            line-height:46px;
            cursor:pointer;
            transition: all 250ms linear;
            width:auto;

            &:hover{
                color:white;
            }
        }
        }

    .container_details{
        display:flex;
        flex-direction:column;
        padding-left:40px;
        padding-right:40px;
        padding-top:20px;

        h2{
            font-size:14px;
            font-family:"Poppins";
            color:white;
            font-weight:400;
        }

        p{
            font-size:14px;
            font-family:"Poppins";
            color:rgb(255,255,255,0.5);
            font-weight:400;
        }

        div{
            display:flex;
            justify-content:space-between;
            align-items:center;
        }

        span{
            font-size:14px;
        }
    }
    }


.info-left{
    display:flex;
    justify-items:space-between;
    height:100%;
    width:70%;
    flex-direction: column;
    justify-content:space-between;

    @media (max-width: 450px) {
        width:100%;

        h2{
            font-size:16px !important;
        }
    }


    h2{
        margin:0;
        font-size:24px;
        font-weight:300;
    }


.info-left__container{
    display:flex;
    flex-direction:row;
    gap:70px;
    align-items: center;

    @media (max-width: 450px) {
        flex-direction:column;
        gap: 0;
        width:100%;
        justify-content:center;
        text-align:center;
        align-items:center;

        .info-left__tempe{
            line-height:100px;
            font-size:80px !important;
        }

        h2{
            font-size:20px !important;
        }

        p{
            font-size:12px !important;
        }
    }

    .info-left__tempe{
       font-size:110px;
       font-weight:400;
        margin:0;
    }


    .info-left__name{
       
        h2{
            font-size:42px;
            font-weight:500;
        }

        p{
            margin:0;
            font-size:21px;
            color: rgba(255, 255, 255, 0.7);
            font-weight:300;
            text-transform:capitalize;
        }
         
     }

`