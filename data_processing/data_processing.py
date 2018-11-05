import ast
import csv
import sys
import pandas as pd
import numpy as np
import re

def computeBlackList(args):
  '''
  takes as input all file names
  returns assignmentIds that completed one or two fTypes but not three
  '''
  d = {}
  ids = []
  ## for each file name
  for arg in args:
    ## take out only the assignmentId and extension (ie, fType)
    l = re.search('\\d.*', arg).group()
    l = l.replace('.txt','').split('_')
    ## if the assignment id isn't already in the dict
    if l[0] not in d.keys():
      ## add it in as a list
      d[l[0]] = [l[1]]
    else:
      ## add it on to the existing list
      d[l[0]] += [l[1]]

  blackList = []

  for key in d:
    if len(d[key]) < 4:
      ## if an assignmentId doesn't have all four phases, add it to blackList
      blackList.append(key)

  return blackList




def summarize_data(args):
  '''
  takes as input all file names (each containing a subject's data)
  passes each one to a separate function to get summarized
  returns a list of lists, where each nested list is a trial
  '''
  ## run a different procedure for each portion of the experiment
  fTypes = ['cued','rvts','demo']
  out = {}

  ## look for subjects that started but didn't complete all phases of the experiment
  blackList = computeBlackList(args)

  for proc in fTypes:
    ## grab only the data we're interested in (from same phases of the experiment)
    
    ## very ugly, but it works
    ## for each x in arg, reduce it down to only the assignmentId, and make sure it isn't in the blackList
    relArgs = [x for x in args if proc in x and re.search('\\d.*', x).group().replace('.txt','').split('_')[0] not in blackList]

    if relArgs:
      ## extract the headers from the first file to use for the whole dataset
      data = ast.literal_eval(open(relArgs[0],'r').read())
      headers = compute_headers(data)

      final_data = [headers]

      ## pass each subject to the summarize_subject function
      for subject in relArgs:
        ## this function returns a list of lists for each subject where each core list is a trial
        final_data += summarize_subject(subject)
      
      out[proc] = final_data

  return out

def compute_headers(data):
  ## make the headers equal to the first layer of keys in the data
  headers = data.keys()

  if 'counterBalance_keys' in data.keys(): 
    ## if counter balance keys are in the first layer, add them to the data
    headers += data['counterBalance_keys'].keys()
  
  ## if it's rvts data
  if 'blockStruct' in data.keys():
    ## add on top of the existing headers all the keys from the block level and the trial level
    headers += data['blockStruct'][0].keys() + data['blockStruct'][0]['trialStruct'][0].keys()
  ## it's it's cued data
  elif 'trialStruct' in data.keys():
    ## only add in the trial level headers
    headers += data['trialStruct'][0].keys()

  ## remove all the nested headers from the var names
  headers = [x for x in headers if x not in ['trialStruct', 'counterBalance_keys', 'blockStruct']]

  return headers
  

def summarize_subject(subjectString):
  '''
  Take as input data from one subject in nested dictionary format.
  Returns a list of lists, where each nested list is one trial (or row)
  '''
  e = ast.literal_eval(open(subjectString, 'r').read())
  
  ## grab the top level data
  subjectLevel = [e[x] for x in e if x not in ['trialStruct', 'blockStruct', 'counterBalance_keys']]
  ## grab counter balance keys if they exist
  if 'counterBalance_keys' in e.keys(): subjectLevel += e['counterBalance_keys'].values()
  trials = []
  
  if 'blockStruct' in e.keys():
    for block in e['blockStruct']:
        for trial in block['trialStruct']:
            trials.append(subjectLevel + [block[x] for x in block if x not in 'trialStruct'] + [x for x in trial.values()])
              
  elif 'trialStruct' in e.keys():
    for trial in e['trialStruct']:
        trials.append(subjectLevel + trial.values())
          
  else:
    trials.append(subjectLevel)
  
  return trials

def main():
  '''
  Takes as input one or more subject data files in JSON form
  Returns one csv with all subject data combined in 2d
  NEW ADDITION:
    takes in json with either: [_rvts, _demo, _cued] extensions, representing different portions of the experiment
    returns three csv datasets for all three phases
  '''
  args = sys.argv[1:]

  if not args:
    print 'usage: file [file ...]'
    sys.exit(1)

  final_data = summarize_data(args)

  for entry in final_data:
    df = pd.DataFrame(np.array(final_data[entry][1:]), columns = final_data[entry][0])
    df.to_csv('../subject_data/final_data_' + entry + '.csv', index = False)

if __name__ == '__main__':
  main()



    