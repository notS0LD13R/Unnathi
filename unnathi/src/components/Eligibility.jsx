import React, { useState } from 'react'
import {BsCheckLg} from 'react-icons/bs'
import './Eligibility.css'

const Eligibility = (props) => {
    
    const [currSection,setCurrSection] = useState(0)
    const [radioData,setRadioData] = useState(Array(3).fill(null))

    const [page,setPage]=useState("null")//temporary replace with usenavigate later on
    
    const sectionCount = 3;//following list should be of this size
    const questions = [
        "What is your current qualification?",
        "What is your current citizenship status?",
        "Is this the first time you are applying to the 2024 cohort of the Teach For India Fellowship, since July 2023?"
    ]
    const images = [
        "https://apply.teachforindia.org/assets/img/MaskgroupMobile_2_0.png",
        "https://apply.teachforindia.org/assets/img/Maskgroup_2_1.png",
        "https://apply.teachforindia.org/assets/img/MaskgroupMobile_2_2.png",
    ]
    const radioValue = [
            ["I'm a graduate","I will graduate by July 2024","I will not graduate by July 2024"],
            ["Indian citizen","Overseas Citizen of India (OCI)","Not an Indian citizen"],
            ["Yes, it's my first application","No, I've applied since July 2023"]
    ]

    const handleRadioClick = (e)=>{
        const temp = [...radioData]
        temp[currSection] = e.target.value
        setRadioData(temp)
    }

    const handleSectionChange = (direction)=>{
        if(direction===-1){//Go back
            if(currSection===0){//At first section
                
            }
            else
                setCurrSection(currSection-1)   
        }
        if(direction===1){//Go front
            
            if(currSection===2){//At last seciton
                if(
                    radioData[0]===radioValue[0][2] ||
                    radioData[1]===radioValue[1][2] ||
                    radioData[2]===radioValue[2][1] ||
                    radioData.includes(null)
                ){//Not Eligible
                    setPage('NotEligible')
                    setCurrSection(0)
                    console.log('NE')
                }
                else{//Eligible
                    setPage('Eligible')
                }
            }
            else
                setCurrSection(currSection+1)
        }
    }
    return (
        
        <>{(()=>{
            if (page === "NotEligible"){
                return(
                <div className='Eligibility NotEligible'>
                    <div className="containerBody">
                        <div className='containerImage'>
                            <img src="https://apply.teachforindia.org/assets/img/IneligibleMobile_02.jpg" alt=""/>
                        </div>
                

                    <div className="contentBox">
                    
                        <b style={{fontSize:"1.5rem"}} >
                            Unfortunately, it looks like you're not eligible to apply this time!    
                        </b>
                        <p>
                            We wish you could join us, but it looks like you don't meet the criteria for the 2024 cohort of the Teach for India Fellowship, that is,
                        </p>
                        <ol>
                            <li>Must graduate before June/July 2024</li>
                            <li>Must be a citizen of India or Overseas Citizen of India</li>
                            <li>Only one application is allowed per person per cohort year, that is, since July 2023</li>
                        </ol>
                        <p>If you're not eligible to work in India, you can apply to a <a href="https://teachforall.org/teach-your-country">Teach For All Fellowship in a different country</a>.</p>
                        <br />
                        <p>If you have already applied before since July 2023 or will not graduate before June/July 2024, you can visit <a href="http://www.teachforindia.org/">our website</a> to explore other internship or volunteering opportunities with us.</p>
                        <br/>
                        <p>If you actually fit all the criteria, answer the 'eligibility check' questions again!</p>

                        <div className="btn">
                            <button 
                                onClick={()=>{
                                    setPage(null)
                                    setRadioData(Array(3).fill(null))
                                }}
                            >
                                Try Again
                            </button>
                    </div>
                </div>
            </div>
            
            </div>
                )
            }
        else if(page === "Eligible"){
            return(
                <div className='Eligibility NotEligible'>
            <div className="containerBody">
            <div className='containerImage'>
                <img 
                    style={{height:"100%"}}
                    src="https://apply.teachforindia.org/assets/img/signuppage_image.jpg" alt=""
                />
            </div>
            

            <div style={{justifyContent:"center"}} className="contentBox">
                
                <b style={{fontSize:"1.5rem"}} >
                    You are eligible !
                </b>
                <p>
                    You satisfy all our criterias and are eligible to apply.
                    Click on the button below to proceed.
                </p>
                
                <div className="btn">
                    <button>
                        <a href="https://apply.teachforindia.org/signup">
                            Apply
                        </a>
                    </button>
                </div>
            </div>
        </div>
        
        </div>
            )
        }
        else{
            return(
                <div className='Eligibility'>
                <div className="containerBody">
                <div className='containerImage'>
                    <img src={images[currSection]} alt=""/>
                </div>
                

                <div className="contentBox">
                    <b>Let's check if you're eligible to apply for the 2024 cohort of the Fellowship.</b>
                    <div className="steps">
                        <span className="line"></span>
                        {
                            (()=>{
                                const arr=[]
                                for(let i=0;i<sectionCount;i++)
                                    arr.push(
                                        <div 
                                            className={i<=currSection?'circle ':'circle grey'} 
                                            key={`circle${i}`}>
                                            {i<currSection?<BsCheckLg/>:i}
                                        </div> 
                                    )
                                return arr
                            })()
                        }
                    </div>
                    <b>{questions[currSection]}</b>
                    <div className='radio'>
                            {
                                radioValue[currSection]
                                .map((label,index)=>{
                                    return(
                                        <label htmlFor={`radio1${index}`} key={label.toString()}>
                                            <input 
                                            type="radio" 
                                            name="radio" 
                                            id={`radio1${index}`} 
                                            value={label}
                                            onChange={handleRadioClick}
                                            checked={label===radioData[currSection]}
                                            />
                                            {label}
                                        </label>
                                    )
                                })
                            }
                            
                        
                    </div>

                    <div className="btn">
                        <button onClick={()=>handleSectionChange(-1)}>Back</button>
                        <button onClick={()=>handleSectionChange(1)}>Continue</button>
                    </div>
                </div>
            </div>
            
            </div>
            )
        }    
        })()}</>
  )
}

export default Eligibility