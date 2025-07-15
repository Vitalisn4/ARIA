const HealthService = require("../../services/HealthService");
const HealthLog = require("../../models/healthLogModel");

// Mock the HealthLog model
jest.mock("../../models/healthLogModel");

describe("HealthService Unit Tests", () => {
  it("should calculate the average sleep correctly", async () => {
    const mockSleepLogs = [
      { value: { duration_minutes: 480 } }, // 8 hours
      { value: { duration_minutes: 420 } }, // 7 hours
    ];
    HealthLog.find.mockResolvedValue(mockSleepLogs);

    const summary = await HealthService.getRecentHealthSummary("someUserId");

    // (480 + 420) / 2 = 450
    expect(summary.averageSleepMinutes).toBe(450);
    expect(summary.totalDataPointsLast7Days).toBe(2);
  });
});
