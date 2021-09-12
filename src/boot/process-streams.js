const { Runner, Sftp } = require('../libraries')

const Ips = ['rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov'];

module.exports = class ProcessStreams {
    
    /**
     * Init the stream processing
     */
    async init() {
        const allIPs = this.getAllIps();
        const runnnerInst = new Runner();

        const processes = allIPs.map(ip => {
            const cmd = this.prepareCommand({ ip });

            return runnnerInst.Init(cmd);
        });

        // const client = await new Sftp().GetConnection({});

        // console.log('Client', client.uploadDir('./', '/home/ec2-user'));
        console.log('Processes', processes);
    }

    /**
     * Get all the IP's stored in DB
     */
    getAllIps() {
        return Ips;
    }

    /**
     * Ping the IP to check accessibility
     */
    pingIp() {

    }

    /**
     * 
     * Prepare ffmpeg command to catch & split the string
     */
    prepareCommand({
        ip, 
        folderPath,
        protocol = 'tcp', 
        segmentTime = 60,
        segmentFormat = 'mp4',
        camNum = 1
    }) {
        const command = `ffmpeg -rtsp_transport ${protocol} \
        -i "${ip}" -f segment -segment_time ${segmentTime} \
        -segment_format ${segmentFormat} -reset_timestamps 1 \
        -strftime 1 -c:v copy -map 0 "${folderPath}/Cam-${camNum}-%s.mp4" \
        `;

        return command;
    }
    
    /**
     * Fetch & store the IP
     */
    fetchAndStore() {

    }
}