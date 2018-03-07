import ast
import csv
import sys

def summarize_data(args):
  '''
  takes as input all file names (each containing a subject's data)
  passes each one to a separate function to get summarized
  returns a list of lists, where each nested list is a trial
  '''

  ## extract the headers from the first file to use for the whole dataset
  data = ast.literal_eval(open(args[0],'r').read())
  headers = data.keys() + data['blockStruct'].keys() + data['blockStruct']['trialStruct'][0].keys()
  headers = [x for x in headers if x not in ['trialStruct', 'blockStruct']]

  final_data = []
  final_data.append(headers)

  ## pass each subject to the summarize_subject function
  for subject in args:
    final_data += summarize_subject(subject)
  
  return final_data
  
def summarize_subject(data):
  '''
  Take as input data from one subject in nested dictionary format.
  Returns a list of lists, where each nested list is one trial (or row)
  '''
  data = ast.literal_eval(open(data, 'r').read())

  trials = data['blockStruct']['trialStruct']

  final_file = []
  trial_data = []

  ## ill have to expand this to iterate over blocks, depending on if we actually use blocks

  ## because we want each trial to be a row, we build up each trial as a separate list, and add to an overall list
  for trial in trials:
    ## subject data is constant, gets added in for each trial
    trial_data = [data[x] for x in data.keys() if x != 'blockStruct']
    ## same for block-wise information
    trial_data += [data['blockStruct'][x] for x in data['blockStruct'].keys() if x != 'trialStruct']
    ## then go through each variable in the trial and add it on to the trial list
    ## because the iterations here return individal strings, .append() adds the element to the existing list
      ## rather than creating a nested list
    for entry in trial:
      trial_data.append(trial[entry])

    ## save everything compiled above as a list inside the final_file list, then go to next trial and repeat
    final_file.append(trial_data)

  return final_file

def main():
  '''
  This accepts command line arguments, passes them on to get summarized,
  gets a list of lists with all data in return, and writes to csv
  '''
  args = sys.argv[1:]

  if not args:
    print 'usage: file [file ...]'
    sys.exit(1)

  final_data = summarize_data(args)

  with open('subject_data/final_data.csv', 'w') as fp:
    a = csv.writer(fp, delimiter = ',')
    for line in final_data:
      a.writerow(line)

if __name__ == '__main__':
  main()



    