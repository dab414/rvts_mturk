ssh-add ~/.ssh/id_rsa.txt

# having issues with local directory when calling the script somewhere other than its local folder
# the below line won't work bc: source and destination cannot both be remote
#rsync -au -e "ssh -p 18765" davebrau@ns1.us69.siteground.us:~/public_html/turk/data/rVTS_pilot/*.txt D:/Users/dbrau/Dropbox/mturk/build\ rvts/subject_data

rsync -au -e "ssh -p 18765" davebrau@ns1.us69.siteground.us:~/public_html/turk/data/rVTS_pilot/*.txt ../subject_data

#eventually ill add an option in here to call the python script to summarize the data right away
#but intense bash programming is something i just don't wanna get into rn