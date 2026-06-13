'use client'

import { StyledPageContainer } from './styled'

import type { PropsWithChildren } from 'react'

const PageContainer = ({ children }: PropsWithChildren) => {
  return <StyledPageContainer>{children}</StyledPageContainer>
}

export default PageContainer
