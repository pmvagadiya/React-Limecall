import React, { useState, useEffect, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useOutsideAlerter } from '../hooks/useOutsideAlerter';

const InnerSidebar = ({
  dataInnerMenu,
  activeComponent,
  tabs,
  handleData,
  dataTabs,
  handleTabData,
  isMenuOpen,
  onMobileclickMenuHandler
}) => {
  const isMobile = useMediaQuery({
    query: '(max-device-width: 767px)'
  })
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onMobileclickMenuHandler);
  // const [activeInnerNav, setActiveInnerNav] = useState(
  //   dataInnerMenu[0].mainSidebar.replace(/\s/g, '')
  // )

  const [activeInnerNav, setActiveInnerNav] = useState(
    activeComponent.replace(/\s/g, '')
  )
  const [isMenu, setIsMenu] = useState(isMenuOpen)

  const [innerTabState, setInnerTabState] = useState({
    activeTitle: dataTabs,
    previousDataTabs: dataTabs
  })
  const optionRemove = () => {
    document.getElementsByTagName('body')[0].removeAttribute('class', '')
  }
  const onClickTab = item => {
    setIsMenu(false)
    optionRemove()
    onMobileclickMenuHandler()
    const stateName = item
    setInnerTabState(
      {
        activeTitle: stateName
      },
      () => {}
    )
    return handleTabData(item)
    // this.setState({ activeTitle: stateName }, () => {
    //   return this.props.handleTabData(stateName)
    // })
  }

  useEffect(() => {
    setIsMenu(isMenuOpen)
  }, [isMenuOpen])

  useState(() => {
    if (dataTabs !== innerTabState.previousDataTabs) {
      setInnerTabState(
        {
          activeTitle: dataTabs,
          previousDataTabs: dataTabs
        },
        () => {
          return handleTabData(innerTabState.activeTitle)
        }
      )
    }
  })

  const currentComponent = activeComponent

  const onClickInner = (event, menu) => {
    let menuString = '/settings/'+ menu.mainSidebar.toLowerCase().split(' ').join('_') + '/' + menu.innerTabs[0].toLowerCase().split(' ').join('_');
    window.history.pushState("object or string", "Title", menuString);

    const stateName = event.currentTarget.firstChild.getAttribute('id')
    // const initialTab = innerTabState.activeTitle
    //   ? innerTabState.activeTitle
    //   : menu.innerTabs[0]
    const initialTab = menu.innerTabs[0]

    if (currentComponent === 'Team') {
      // document.querySelector('#TeamSettings').classList.remove('active')
    }
    setActiveInnerNav(stateName)
    handleData(stateName, initialTab, isMobile)
  }

  useEffect(() => {
    if (currentComponent === 'Team') {
      // document.querySelector('#TeamSettings').classList.add('active')
      // document.querySelector('#MySettings').classList.remove('active')
    }
  }, [currentComponent])
  return (
    <div
      ref={wrapperRef}
      className={`innersidebar-container ${isMenu ? 'open' : null}`}
    >
      <div className="innersidebar-wrapper">
        {dataInnerMenu.map((menu, i) => (
          <div
            key={i}
            onClick={e => onClickInner(e, menu)}
            className={
              activeInnerNav === `${menu.mainSidebar.replace(/\s/g, '')}`
                ? 'innersidebar-subitem active'
                : 'innersidebar-subitem'
            }
          >
            <span id={`${menu.mainSidebar.replace(/\s/g, '')}`}>
              {menu.mainSidebar}
              <div className="innnerTab_wrapper">
                {tabs.map(tab => {
                  return (
                    <div key={i} className="innertab-item">
                      <div
                        className="innser_tab_class"
                        onClick={() => onClickTab(tab)}
                        className={
                          innerTabState.activeTitle === tab ? 'active' : null
                        }
                      >
                        {tab}
                      </div>
                    </div>
                  )
                })}
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InnerSidebar
