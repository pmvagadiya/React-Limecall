import React from 'react'
import './style.scss';
import axios from 'axios'
import { CommonNotify } from '../../../common/CommonNotify';

class TagsComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        currentTagsList : []
      };
    }

    componentDidMount = () => {
      this.fetchTagsData();
    }

    fetchTagsData = () => {
      let token = localStorage.getItem('access_token');
      let head = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }

      axios.get(`${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`, head).then((res) => {
        if(res.data.data && res.data.data[0]){
          const tmpTags = res.data.data[0].tags ? res.data.data[0].tags : [];
          const newTags = tmpTags.map((tag)=>{
            return {
              tag: tag,
              selected: false
            }
          })
          this.setState({currentTagsList: newTags})
        }
      }).catch((error) => {
          console.log(error);
      });
    }

    saveTags = () => {
      let updatedTags = [];
      this.state.currentTagsList.forEach((tag)=>{
        if(tag.selected){
          updatedTags.push(tag.tag);
        }
      })
      
      let tagsData = {
        lead_id: this.props.leadID,
        // lead_id: "6049",
        tags: updatedTags
      }

      let token = localStorage.getItem('access_token');
      let head = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
      const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/add-tags` ;
        axios.post(url, tagsData, head).then((res) => {
          CommonNotify('Tags Saved Successfully', 'success');
        }).catch((error) => {
            console.log(error);
            CommonNotify(`Can't Save Tags, Please try again`)
        });
    }

    updateTagSelection = (value, index) => {
      let currentTagsList = JSON.parse(JSON.stringify(this.state.currentTagsList));
      currentTagsList[index].selected = value;
      this.setState({currentTagsList: currentTagsList});
    }

    render = () => {
        return (
          <div className='call-summary-container-main tags-container-main'>
            <div className='hor-row heading-main'>
                Add Tags
                <i class="material-icons tags-container-close-icon"
                  onClick = { this.props.toggleDisplayTag} >close</i>
            </div>
            <div className='hor-row call-info-container-main tags-container'>
              {
                this.state.currentTagsList.map((tag, index)=>(
                  <div className={'tags-item' + ( tag.selected ? ' active-tags-item' : '' )}>
                    { tag.tag }
                    <i class="material-icons tags-close-icon"
                      onClick = { () => this.updateTagSelection(!tag.selected, index) }>
                      { tag.selected ? 'close' : 'add_circle_outline' }
                    </i>
                  </div>
                ))
              }
            </div>
            <div className = 'hor-row new-tag-container-main'>
              <i class="material-icons add-circle-icon"
                onClick = { this.saveTags} >
                  save
              </i>
            </div>
          </div>
        )
    }
}

export default TagsComponent;