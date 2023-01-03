'use client'
import React, { ReactElement, ReactNode } from 'react'
import SmoothCollapse from 'react-smooth-collapse'
import { useAccordion } from './Accordion'

export default function AccordionItem ({ label, children, id }: {
  label: string | ReactNode
  children: ReactNode
  id: string
}): ReactElement {
  const [expanded, toggle] = useAccordion(id)
  return <div className="accordion-item">
        <h2 className="accordion-header" id={id}>
            <button
                className={`accordion-button ${expanded ? '' : 'collapsed'}`}
                type="button"
                aria-expanded={expanded ? 'true' : 'false'}
                aria-controls={`${id}_body`}
                onClick={toggle}
            >
                {label}
            </button>
        </h2>
        <SmoothCollapse expanded={expanded} id={`${id}_body`} aria-labelledby={id}>
            <div className="accordion-body">
                {children}
            </div>
        </SmoothCollapse>
    </div>
}
