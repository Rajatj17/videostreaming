# In Place Instance
1. Create file stream of 1 minute
2. Push the file to S3 & attach a worker to process those files

# Deployed Worker
1. Split the video using ffmpeg into 10 seconds duration & generate a m3u8 files
   1. Use DB if needed
2. From Audio extract the vocals using spleeter. Then split the audio into 10 seconds duration. 
   1. Use DB if needed
3. Keep audio & video filename same with the only difference in extension

# Deployed API
1. When API is clicked to get stream from particular date to a particular date
   1. Check if file exists in those dates
   2. Now generate a static m3u8 file by combining m3u8 of every 1 minute video &  1 minute audio corresponding to those 1 minute vidoes avaialable b/w that duration
      1. Generating m3u8 with #EXT-X-ENDLIST param might increase the response time so        
         1. generate a static file
         2. give its addess to client (client can start retrieving data)
         3. then keep on Appending new stream data to it