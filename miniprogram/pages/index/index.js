Page({
  data: {
    seats: []
  },
  onLoad() {
    const db = wx.cloud.database();
    db.collection('cafeteria_seats').watch({
      onChange: snapshot => {
        this.setData({ seats: snapshot.docs });
      },
      onError: err => console.error('Watch failed:', err)
    });
    this.loadSeats();
  },
  loadSeats() {
    const db = wx.cloud.database();
    db.collection('cafeteria_seats').get({
      success: res => {
        this.setData({ seats: res.data });
      },
      fail: err => console.error('Fetch failed:', err)
    });
  },
  onSeatTap(e) {
    const seatId = e.currentTarget.dataset.seatId;
    wx.showToast({ title: `Seat ${seatId}: ${this.data.seats.find(s => s.seatId === seatId).status}` });
  }
});