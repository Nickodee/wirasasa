import { create } from 'zustand';

const useJobStore = create((set) => ({
  activeJob: null,
  jobHistory: [],

  /**
   * Set active job
   * @param {object} job - Job object
   */
  setActiveJob: (job) => {
    set({ activeJob: job });
  },

  /**
   * Update job status
   * @param {string} status - New job status
   */
  updateJobStatus: (status) => {
    set((state) => ({
      activeJob: state.activeJob
        ? { ...state.activeJob, status }
        : null,
    }));
  },

  /**
   * Add job to history
   * @param {object} job - Job object
   */
  addToHistory: (job) => {
    set((state) => ({
      jobHistory: [job, ...state.jobHistory],
    }));
  },

  /**
   * Clear active job
   */
  clearActiveJob: () => {
    set({ activeJob: null });
  },

  /**
   * Update active job data
   * @param {object} data - Job data to update
   */
  updateActiveJob: (data) => {
    set((state) => ({
      activeJob: state.activeJob
        ? { ...state.activeJob, ...data }
        : null,
    }));
  },
}));

export default useJobStore;
