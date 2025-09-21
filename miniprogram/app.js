App({
  onLaunch() {
    wx.cloud.init({ env: 'your-cloud-env-id' });
  }
});