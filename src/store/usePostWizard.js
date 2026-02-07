import { create } from 'zustand'

/**
 * Post Wizard State Management
 * 
 * Manages the multi-step "Create Post" flow from source selection 
 * through video picking to destination confirmation.
 */

const usePostWizard = create((set, get) => ({
  // ========== WIZARD STATE ==========
  isOpen: false,
  step: 1, // 1: Source, 2: Video, 3: Confirm
  
  // ========== SELECTION STATE ==========
  selectedSource: null, // 'channel_id' | 'url_paste'
  selectedSourceType: null, // 'channel' | 'url'
  selectedChannel: null, // Full channel object
  selectedVideo: null, // { id, title, thumbnail, duration, date, views }
  pastedUrl: '',
  targetSite: null, // Site ID for publishing
  
  // ========== LOADING STATES ==========
  isLoadingVideos: false,
  isLoadingTranscript: false,
  
  // ========== NAVIGATION ACTIONS ==========
  openWizard: () => set({ 
    isOpen: true, 
    step: 1,
    selectedSource: null,
    selectedSourceType: null,
    selectedChannel: null,
    selectedVideo: null,
    pastedUrl: '',
    targetSite: null,
  }),
  
  closeWizard: () => set({ 
    isOpen: false,
    step: 1,
    selectedSource: null,
    selectedSourceType: null,
    selectedChannel: null,
    selectedVideo: null,
    pastedUrl: '',
    targetSite: null,
  }),
  
  setStep: (step) => set({ step }),
  
  nextStep: () => set((state) => ({ 
    step: Math.min(state.step + 1, 3) 
  })),
  
  prevStep: () => set((state) => ({ 
    step: Math.max(state.step - 1, 1) 
  })),

  // ========== SOURCE SELECTION ==========
  selectChannel: (channel) => set({
    selectedSource: channel.id,
    selectedSourceType: 'channel',
    selectedChannel: channel,
    step: 2, // Auto-advance to video picker
  }),
  
  selectUrlPaste: () => set({
    selectedSource: 'url_paste',
    selectedSourceType: 'url',
    selectedChannel: null,
    step: 2, // Go to URL input step
  }),

  // ========== VIDEO SELECTION ==========
  selectVideo: (video) => set({
    selectedVideo: video,
  }),
  
  clearVideo: () => set({
    selectedVideo: null,
  }),

  setPastedUrl: (url) => set({
    pastedUrl: url,
  }),

  // ========== DESTINATION SELECTION ==========
  setTargetSite: (siteId) => set({
    targetSite: siteId,
  }),

  // ========== LOADING STATES ==========
  setLoadingVideos: (loading) => set({
    isLoadingVideos: loading,
  }),
  
  setLoadingTranscript: (loading) => set({
    isLoadingTranscript: loading,
  }),

  // ========== ACTIONS ==========
  confirmAndOpenEditor: () => {
    const state = get()
    if (state.selectedVideo && state.targetSite) {
      // In real app, would save draft and navigate to editor
      // For now, just close and return the selections
      const result = {
        video: state.selectedVideo,
        targetSite: state.targetSite,
        sourceType: state.selectedSourceType,
        channel: state.selectedChannel,
      }
      
      // Close wizard
      set({ isOpen: false })
      
      return result
    }
    return null
  },

  // ========== COMPUTED VALUES ==========
  canProceedToConfirm: () => {
    const state = get()
    if (state.selectedSourceType === 'channel') {
      return !!state.selectedVideo
    }
    if (state.selectedSourceType === 'url') {
      return state.pastedUrl.length > 10
    }
    return false
  },

  canOpenEditor: () => {
    const state = get()
    return !!state.targetSite && (!!state.selectedVideo || state.pastedUrl.length > 10)
  },

  // ========== RESET ==========
  reset: () => set({
    isOpen: false,
    step: 1,
    selectedSource: null,
    selectedSourceType: null,
    selectedChannel: null,
    selectedVideo: null,
    pastedUrl: '',
    targetSite: null,
    isLoadingVideos: false,
    isLoadingTranscript: false,
  }),
}))

export default usePostWizard
