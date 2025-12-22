import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job } from '../types';

interface JobContextType {
  clientJobs: Job[];
  addClientJob: (job: Job) => void;
  updateJobStatus: (jobId: string, status: Job['status']) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clientJobs, setClientJobs] = useState<Job[]>([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const stored = await AsyncStorage.getItem('clientJobs');
      if (stored) {
        setClientJobs(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  };

  const saveJobs = async (jobs: Job[]) => {
    try {
      await AsyncStorage.setItem('clientJobs', JSON.stringify(jobs));
    } catch (error) {
      console.error('Error saving jobs:', error);
    }
  };

  const addClientJob = (job: Job) => {
    const newJobs = [...clientJobs, job];
    setClientJobs(newJobs);
    saveJobs(newJobs);
  };

  const updateJobStatus = (jobId: string, status: Job['status']) => {
    const updatedJobs = clientJobs.map((job) =>
      job.id === jobId ? { ...job, status } : job
    );
    setClientJobs(updatedJobs);
    saveJobs(updatedJobs);
  };

  return (
    <JobContext.Provider value={{ clientJobs, addClientJob, updateJobStatus }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

