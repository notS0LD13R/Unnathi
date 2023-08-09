import React, { useRef, useState } from 'react'
import {BsCheckLg} from 'react-icons/bs'
import './Eligibility.css'

const Eligibility = (props) => {
    
    const [currSection,setCurrSection] = useState(0)
    const radioDataRef = useRef(Array(currSection).fill(null))
    
    const sectionCount = 3;//following list should be of this size
    const questions = [
        "What is your current qualification?",
        "What is your current citizenship status?",
        "Is this the first time you are applying to the 2024 cohort of the Teach For India Fellowship, since July 2023?"
    ]
    const images = [
        "https://apply.teachforindia.org/assets/img/MaskgroupMobile_2_0.png",
        "https://apply.teachforindia.org/assets/img/Maskgroup_2_1.png",
        "https://apply.teachforindia.org/assets/img/MaskgroupMobile_2_2.png"
    ]
    const radioData = [
            ["I'm a graduate","I will graduate by July 2024","I will not graduate by July 2024"],
            ["Indian citizen","Overseas Citizen of India (OCI)","Not an Indian citizen"],
            ["Yes, it's my first application","No, I've applied since July 2023"]
    ]

    const handleRadioClick = (e)=>{
        radioDataRef.current[currSection]=e.target.value
    }

    const handleSectionChange = (direction)=>{
        if(direction===-1){//Go back
            if(currSection===0){//At first section
                //navigate to main apge
            }
            else
                setCurrSection(currSection-1)   
        }
        if(direction===1){//Go front
            if(currSection===2){//At last seciton
                //navigate to next page
            }
            else
                setCurrSection(currSection+1)
        }
    }
    return (
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
                        radioData[currSection]
                        .map((label,index)=>{
                            return(
                                <label htmlFor={`radio1${index}`} key={`rkey${index}`}>
                                    <input 
                                    type="radio" 
                                    name="radio" 
                                    id={`radio1${index}`} 
                                    value={label}
                                    onClick={handleRadioClick}
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

export default Eligibility