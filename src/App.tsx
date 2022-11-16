import { useEffect, useState, useRef } from "react"
import axios from "axios"
import bg from "./resources/bg.webp"
import lol from "./resources/lol.png"
import assasin from "./resources/assasin.png"
import fighter from "./resources/fighter.png"
import arrow from "./resources/arrow.png"
import mage from "./resources/mage.png"
import marksman from "./resources/marksman.png"
import tank from "./resources/tank.png"
function App() {
    const [champions, setChampions]=useState([])
    const [skins, setSkins]=useState([])
    const [currentChampion, setCurrentChampion]=useState('')
    const [currentSkin, setCurrentSkin]=useState(0)
    const [currentPatch, setCurrentPatch]=useState('')
    const [inSelection, setInSelection]=useState(false)
    const [searchEngineVal, setSearchEngineVal]=useState('')
    const inputSearch = useRef(0)
    const champSelectionDiv = useRef(0)
    const [assasinTagStatus,setAssasinTagStatus]=useState(false)
    const [fighterTagStatus,setFighterTagStatus]=useState(false)
    const [mageTagStatus,setMageTagStatus]=useState(false)
    const [marksmanTagStatus, setMarksmanTagStatus]=useState(false)
    const [tankTagStatus,setTankTagStatus]=useState(false)

    const onHandleChampion = prop =>{
        setCurrentChampion(prop)
    }
    const selectChampion = () =>{
        setInSelection(true)
        champSelectionDiv.current.style.opacity='0'
        alert('League of Champions is under beta, it may contains errors and does not have enough info yet!')
        setTimeout(() => {
           champSelectionDiv.current.style.display='none' 
        }, 600);
        for(let i = 0; i<=10; i++){
fetch(`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${currentChampion}_${i}.jpg`, { method: 'HEAD' })
    .then(res => {
        if (res.ok) {
            setSkins(old=>[...old,{
                skin:`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${currentChampion}_${i}.jpg`,
                id:i
            }])
        }
    }).catch(err => console.log('Error:', err));
};
    }
    useEffect(()=>{
        axios.get('http://ddragon.leagueoflegends.com/cdn/12.21.1/data/en_US/champion.json').then((req)=>{
            if(req.data){
                setChampions(req.data.data)
                axios.get('https://ddragon.leagueoflegends.com/api/versions.json').then((req2)=>{
                    if(req2.data){
                        setCurrentPatch(req2.data[0])
                    }
                })
            }
        })
    },[])
  return (
      <div>
           {
               currentChampion === '' ? 
            <img className="absolute z-1 h-[100vh] w-[100vw] object-center object-cover" src={bg}/>
               :
            <img className="absolute z-1 h-[100vh] w-[100vw] object-top object-cover" src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${currentChampion}_${currentSkin}.jpg`}/>
          }
          {
              inSelection ? 
                  <img src={arrow} className='absolute top-0 left-0 h-[38px] w-[52px] cursor-pointer mt-7 ml-5' onClick={()=>{
                      setInSelection(false)
                      setCurrentSkin('')
                      setCurrentChampion('')
                      champSelectionDiv.current.style.opacity='1'
          }}/>
              : null 
          }
          <div className='absolute flex z-2 bottom-5 w-[100vw] justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="dodgerblue" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" /> </svg>
              <div className='w-[60vw] flex flex-wrap h-[150px] pb-5 gap-4 overflow-y-scroll'>
              {skins.map((asset)=>{
                return(
                    <img onClick={()=>{
                        setCurrentSkin(asset.id)
                    }} style={{border:`1px solid ${currentSkin == asset.id ? '#D5C396' : 'transparent'}`}} className='cursor-pointer h-[120px] mb-5 w-[250px] rounded-md object-cover object-top' src={asset.skin}/>
                )
              })}
              </div>
          </div>
          <div ref={champSelectionDiv}>
          <div className="absolute z-1 h-[100vh] w-[100vw] bg-[rgba(0,0,0,.55)]"/>
          <div className="absolute z-2 h-[100vh] justify-center flex items-center pl-6 max-[600px]:pl-0">
              <img className="absolute z-0 h-[80px] ml-9 mt-8 top-0 left-0 object-center object-cover max-[1250px]:hidden" src={lol}/>
<img className="absolute z-0 h-[100%] top-[50%] left-[50%] circle-bg object-center object-cover" src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/rg-xr-duo-reveal/es_AR/6429fe351efd191ad5e2512edee5b24fb94c94cd/assets/img/circle-frame.png" alt=""/>
              <div className="absolute z-2 gap-4 top-10 flex w-full justify-center">
                  <img onClick={()=>{
                    setSearchEngineVal('')
                    inputSearch.current.value=''
                    setAssasinTagStatus(old=>!old)
                    setFighterTagStatus(false)
                    setMageTagStatus(false)
                    setMarksmanTagStatus(false)
                    setTankTagStatus(false)
                  }} id={assasinTagStatus ? 'assasin-tag' : null} className='h-[60px] cursor-pointer max-[600px]:h-[45px]' src={assasin}/>
                  <img onClick={()=>{
                    setSearchEngineVal('')
                    inputSearch.current.value=''
                    setFighterTagStatus(old=>!old)
                    setAssasinTagStatus(false)
                    setMageTagStatus(false)
                    setMarksmanTagStatus(false)
                    setTankTagStatus(false)
                  }} id={fighterTagStatus ? 'fighter-tag' : null} className='h-[60px] cursor-pointer max-[600px]:h-[45px]' src={fighter}/>
                  <img onClick={()=>{
                    setSearchEngineVal('')
                    inputSearch.current.value=''
                      setMageTagStatus(old=>!old)
                    setFighterTagStatus(false)
                    setAssasinTagStatus(false)
                    setMarksmanTagStatus(false)
                    setTankTagStatus(false)
                  }} id={mageTagStatus ? 'mage-tag' : null} className='h-[60px] cursor-pointer max-[600px]:h-[45px]' src={mage}/>
                  <img onClick={()=>{
                    setSearchEngineVal('')
                    inputSearch.current.value=''
                    setMarksmanTagStatus(old=>!old)
                    setTankTagStatus(false)
                    setMageTagStatus(false)
                    setFighterTagStatus(false)
                    setAssasinTagStatus(false)
                  }} id={marksmanTagStatus ? 'marksman-tag' : null} className='h-[60px] cursor-pointer max-[600px]:h-[45px]' src={marksman}/>
                  <img onClick={()=>{
                    setSearchEngineVal('')
                    inputSearch.current.value=''
                      setTankTagStatus(old=>!old)
                    setMarksmanTagStatus(false)
                    setMageTagStatus(false)
                    setFighterTagStatus(false)
                    setAssasinTagStatus(false)
                  }} id={tankTagStatus ? 'tank-tag' : null} className='h-[60px] cursor-pointer max-[600px]:h-[45px]' src={tank}/>
                <div class="icon-input max-[870px]:hidden">
                    <input ref={inputSearch} onChange={(e)=>{
                    setSearchEngineVal(e.target.value)
                    setMarksmanTagStatus(false)
                    setTankTagStatus(false)
                    setMageTagStatus(false)
                    setFighterTagStatus(false)
                    setAssasinTagStatus(false)
                    }} class="icon-input__text-field" placeholder="Search" type="text"/>
                  <i class="gg-search" color={'dodgerblue'}></i>
                </div>
              </div>
              <div className="z-0 flex overflow-y-scroll justify-center w-[100vw] pl-[30vw] pr-[30vw] gap-[21px] flex-wrap h-[64vh] md-[1429px]: pl-[20vw] md-[1429px]: pr-[20vw]">
                  { Object.keys(champions).filter((key)=>searchEngineVal != '' ? champions[key].id.toLowerCase().includes(searchEngineVal.toLowerCase()) : champions[key].id && assasinTagStatus ? champions[key].tags.includes('Assassin') : searchEngineVal != '' ? champions[key].id.toLowerCase().includes(searchEngineVal.toLowerCase()) : champions[key].id && fighterTagStatus ? champions[key].tags.includes('Fighter') : searchEngineVal != '' ? champions[key].id.toLowerCase().includes(searchEngineVal.toLowerCase()) : champions[key].id && mageTagStatus ? champions[key].tags.includes('Mage') : searchEngineVal != '' ? champions[key].id.toLowerCase().includes(searchEngineVal.toLowerCase()) : champions[key].id && marksmanTagStatus ? champions[key].tags.includes('Marksman') : tankTagStatus ? champions[key].tags.includes('Tank') : searchEngineVal != '' ? champions[key].id.toLowerCase().includes(searchEngineVal.toLowerCase()) : champions[key].id).map((key)=>{
                 return(
                 <div className="flex-col">
                 <img className={` h-[6.1rem] cursor-pointer object-center object-cover rounded-[6px] border-transparent hover: border-gold ${champions[key].id === currentChampion ? 'active' : null} max-[700px]:h-[5rem]`} onClick={()=>onHandleChampion(champions[key].id)} src={`http://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${champions[key].id}.png`}/> 
                     <h3 className='text-[#ede7de] text-[15px] text-center mt-2 max-[700px]:text-[13px]'>{champions[key].name}</h3>
                     </div>
                 )
                }) }
            </div>
  <div class="hextec-button">
      <div class="confirm-button" onClick={()=>currentChampion != '' ? selectChampion() : null} style={{cursor:currentChampion == '' ? 'initial' : null}}>
      <div class="button--inner-border" style={{background:currentChampion == '' ? '#444' : null}}>
          <div class="button--inner" style={{background:currentChampion == '' ? '#222' : null}}><span class="button--text" style={{color:currentChampion == '' ? '#555' : null}}>LOCK IN</span></div>
      </div>
    </div>
  </div>
              </div>
              <h2 className='absolute z-3 text-[13px] bottom-3 translate-x-[-50%] translate-y-[-50%] ml-[170px] text-[#ede7de] max-[700px]:hidden'>
                © 2022 League of Champs. All Rights Reserved.
              </h2>
              <h2 className='absolute z-3 text-[13px] bottom-3 translate-x-[-50%] translate-y-[-50%] right-0 text-[#ede7de] max-[700px]:hidden'>
                  Patch notes {currentPatch}
              </h2>
          </div>
      </div>
  )
}

export default App
