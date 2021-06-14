import React from 'react'
import './style.scss';

class NotesComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        currentNotesData: '',
        previousNotesList: []
        
      };
    }
    
  saveCallNotesData = () => {
    if(!this.state.currentNotesData){
      return false;
    }
    const notesData = {
      content : this.state.currentNotesData,
      creation_time: new Date()
    }

    let previousNotesList = this.state.previousNotesList;
    previousNotesList.push(notesData);
    this.setState({previousNotesList: previousNotesList, currentNotesData: ''});
    this.props.saveCallNotesData(notesData);
  }

    render = () => {
        return (
          <div className='call-summary-container-main tags-container-main'>
            <div className='hor-row heading-main'>
                Add Notes
                <i class="material-icons tags-container-close-icon"
                  onClick = { this.props.toggleDisplayTag} >close</i>
            </div>
            <div className='hor-row call-info-container-main tags-container'>
              <div className='hor-row notes-item-list'>
                {
                  this.state.previousNotesList.map((note, index)=>(
                    <>
                      <div className='hor-row notes-date-container'>
                        { new Date(note.creation_time). toLocaleDateString() + ' ' + new Date(note.creation_time). toLocaleTimeString() }
                      </div>
                      <div className='note-text-main'
                        style={{borderBottom: `${index < (this.state.previousNotesList.length - 1) ? '1px solid #A4ABC4' : '0' }`}}>
                        { note.content }
                      </div>
                    </>
                  ))
                }

              </div>
            </div>
            <div className = 'hor-row new-tag-container-main'>
              <input type='text' placeholder='Write your notes here...'
                value = { this.state.currentNotesData } 
                onChange = { (event)=> this.setState({currentNotesData: event.target.value}) }/>
                <i class="material-icons add-circle-icon"
                  onClick = {() => this.saveCallNotesData()}>
                  send
                </i>
            </div>
          </div>
        )
    }
}

export default NotesComponent;