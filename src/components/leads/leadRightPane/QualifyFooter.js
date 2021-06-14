import React, {useState} from 'react'
import likeIcon from '../../../assets/images/like.png'
import dislikeIcon from '../../../assets/images/dislike.png'

import { 
  onLeadScore
} from '../../../config/leadAPI'


const QualifyFooter = ({ leadData, leadScore }) => { 

  const processNegetiveArray = item => {
    const negetiveItems = ['dis', 'nege', 'bad', '0', 'false', 'spam', 'no'];
    let flag = false;
    negetiveItems.forEach(element => { 
      if(item.value.toString().toLowerCase().includes(element.toString().toLowerCase()) || item.text.toString().toLowerCase().includes(element.toString().toLowerCase())){  
        flag = true
        return
      }
    });
    return flag;
  }

  const processPositiveArray = item => {
    const negetiveItems = ['qualified', 'posi', 'good', '1', 'true', 'lead', 'won', 'customer', 'opportunity', 'yes'];
    let flag = false;
    negetiveItems.forEach(element => { 
      if(item.value.toString().toLowerCase().includes(element.toString().toLowerCase()) || item.text.toString().toLowerCase().includes(element.toString().toLowerCase())){  
        flag = true
        return
      }
    });
    return flag;
  }


  const processScoreData = scores => {     
    const obj = {
      "positive": null,
      "negetive": null
    }

    const positiveCheck = [];

    scores.forEach(element => {
      if(processNegetiveArray(element)){
        obj.negetive = element;
      }else{
        // get posi
        positiveCheck.push(element)
      }
    });

    positiveCheck.forEach(element => {
      if(processPositiveArray(element)){
        obj.positive = element;
      }
    });

    return obj;    

  }

   const getScore = (score, need='negetive', key = 'value') => {

      

      if(score['negetive'] == null && score['positive'] == null){
        return ''
      }

      if(score[need] != null){
        return score[need][key]
      }
      if(need == 'negetive'){        
        return score['positive'][key]
      }      
      return score['negetive'][key]

   }


    //console.info("ls", leadScore)
    const leadScoreData = processScoreData(leadScore);
    console.info(leadScoreData, leadData.score) 
    const [likeDislike, setLikeDislike] = useState(leadData.score == null || leadData.score == '' ? 2 : leadData.score == getScore(leadScoreData, 'negetive') ? 3 : 1 
    )
   
     


  return (
    <div className="aboutQualify">
      <div className="qualifywrap">
        <div className="qualify">
          <div>
            {likeDislike == 3 && leadScoreData.positive != null  ? (
              <div onClick={ () => {onLeadScore(getScore(leadScoreData, 'positive'), leadData.id); setLikeDislike(1)} }>
                <img src={likeIcon} alt="" />{' '}
                <label className="greenFont">{ getScore(leadScoreData, 'positive', 'text') }</label>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="qualify">
          <div>
            {likeDislike == 1 && leadScoreData.negetive != null ? (
              <div onClick={ () => {onLeadScore(getScore(leadScoreData, 'negetive'), leadData.id); setLikeDislike(3)} }>
                <img src={dislikeIcon} alt="" />{' '}
                <label className="redFont">{getScore(leadScoreData, 'negetive', 'text')}</label>
              </div>
            ) : (
              ''
            )}
          </div>
          {likeDislike == 2 ? (
            <div className="like-or-dislike">
              {' '}
              {  leadScoreData.positive != null && (
                <div className="like" onClick={ () => {onLeadScore(getScore(leadScoreData, 'positive'), leadData.id);  setLikeDislike(1) } }>
                  <img src={likeIcon} alt="" />{' '}
                  <label className="greenFont">{getScore(leadScoreData, 'positive', 'text')}</label>
                </div>)
              }

              {  leadScoreData.negetive != null && (
                <div className="dislike" onClick={ () => {onLeadScore(getScore(leadScoreData, 'negetive'), leadData.id);  setLikeDislike(3) } }>
                  <img src={dislikeIcon} alt="" />{' '}
                  <label className="redFont">{getScore(leadScoreData, 'negetive', 'text')}</label>
                </div>)
              }
              
             
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
export default QualifyFooter
