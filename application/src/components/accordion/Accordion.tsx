'use client'
import React, {ReactElement, ReactNode, useContext, useState} from "react";

const AccordionContext = React.createContext<{
    expandedId: string | undefined,
    setExpandedId: (id: string | undefined) => void
} | undefined>(undefined)

export const useAccordion = (id: string): [boolean, () => void] => {
    const context = useContext(AccordionContext)
    if (context === undefined) {
        throw new Error('Hook useAccordion needs to be used in Accordion element')
    }
    const {expandedId, setExpandedId} = context;
    return [
        expandedId === id,
        () => {
            setExpandedId(expandedId === id ? undefined : id)
        }
    ]
}

export default function Accordion({children}: {
    children: ReactNode
}): ReactElement {
    const [expandedId, setExpandedId] = useState<string | undefined>(undefined)
    return <AccordionContext.Provider value={{expandedId, setExpandedId}}>
        <div className="accordion" id="accordionExample">
            {children}
        </div>
    </AccordionContext.Provider>
}
