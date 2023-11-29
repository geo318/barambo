'use client'

import { FacebookProvider, CustomChat } from 'react-facebook'

export const FbChat = () => (
  <FacebookProvider appId='123456789'>
    <CustomChat pageId='117460804932219' minimized={true} />
  </FacebookProvider>
)
