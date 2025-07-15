const HealthLog = require("../models/healthLogModel");

class HealthService {
  static async createLog(userId, logData) {
    return await HealthLog.create({ user: userId, ...logData });
  }

  static async getRecentHealthSummary(userId) {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentSleep = await HealthLog.find({
      user: userId,
      type: "Sleep",
      recordedAt: { $gte: sevenDaysAgo },
    });
    const avgSleep =
      recentSleep.length > 0
        ? recentSleep.reduce(
            (acc, log) => acc + (log.value.duration_minutes || 0),
            0
          ) / recentSleep.length
        : 0;

    return {
      averageSleepMinutes: Math.round(avgSleep),
      totalDataPointsLast7Days: recentSleep.length,
    };
  }
}

module.exports = HealthService;
