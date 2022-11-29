const { Runner } = require('../../src/libraries')

const Ips = [
    {
        ip: 'rtsp://192.168.88.15/mainstream',
        assetName: 'Asset_Cam_Internal_192_168_88_15',
        zone: 'Zone_1'
    // },
    // {
    //     ip: 'rtsp://192.168.88.16/mainstream',
    //     assetName: 'Asset_Cam_Internal_192_168_88_16',
    //     zone: 'Zone_2'
    },
];

module.exports = class ProcessStreams {
    
    /**
     * Init the stream processing
     */
    async init() {
        const allIPs = this.getAllIps();
        const runnnerInst = new Runner();

        const processes = allIPs.map((ipObject) => {
            const cmd = this.prepareCommand({ ip: ipObject.ip, assetName: ipObject.assetName });

            return runnnerInst.Init(cmd);
        });

        console.log(processes);
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
        foldePath = 'src/storage',
        protocol = 'tcp', 
        segmentTime = 5,
        segmentFormat = 'mp4',
        zoneName = 'Zone_0',
        assetName = 1
    }) {
        const command = `ffmpeg -rtsp_transport ${protocol} \
        -i "${ip}" -f segment -segment_time ${segmentTime} \
        -segment_format ${segmentFormat} -reset_timestamps 1 \
        -strftime 1 -c:v copy -map 0 -an "${foldePath}/${zoneName}-${assetName}-Year_%Y-Month_%m-Date_%d-Hr_%H-Min_%M-Sec_%S-Ts_%s.mp4" \
        `;

        return command;
    }
    
    /**
     * Fetch & store the IP
     */
    fetchAndStore() {

    }
}