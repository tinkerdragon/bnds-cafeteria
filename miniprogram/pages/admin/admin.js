Page({
  data: {
    seatIds: ['A1', 'A2', 'B1', 'B2'], // Replace with your actual seat IDs
    selectedSeat: 'A1',
    status: 'free'
  },
  onSeatSelect(e) {
    this.setData({ selectedSeat: this.data.seatIds[e.detail.value] });
  },
  onStatusChange(e) {
    this.setData({ status: e.detail.value });
  },
  updateSeat() {
    const db = wx.cloud.database();
    db.collection('cafeteria_seats').where({
      seatId: this.data.selectedSeat
    }).update({
      data: {
        status: this.data.status,
        updatedAt: db.serverDate()
      },
      success: () => wx.showToast({ title: 'Updated' }),
      fail: err => console.error('Update failed:', err)
    });
  }
});