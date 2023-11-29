'use client'

import { FacebookProvider, CustomChat } from 'react-facebook'

export const FbChat = () => (
  <FacebookProvider appId='728900049145428'>
    <CustomChat pageId='117460804932219' minimized={true} />
  </FacebookProvider>
)
