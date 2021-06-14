import React, { useState } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

function RecentPageViews() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const activeIndexs = activeIndex
    const newIndex = activeIndexs === index ? -1 : index
    setActiveIndex(newIndex)
  }
  return (
    <>
      <Accordion className="Lead_wrapper" fluid styled>
        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={handleClick}
        >
          Recent page views
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>
            Three common ways for a prospective owner to acquire a dog is from
            pet shops, private owners, or shelters.
          </p>
        </Accordion.Content>
      </Accordion>
    </>
  )
}

export default RecentPageViews
