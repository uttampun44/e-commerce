import { Router, Response } from "express";
import { AuthRequest, authMiddleware } from "@/middleware/auth.middleware";

const DashboardRouter = Router();

/**
 * Protected Dashboard Routes
 * All routes here require authentication via AuthMiddleware
 */

// GET /api/v1/dashboard/stats - Get dashboard statistics (PROTECTED)
DashboardRouter.get("/stats", authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    // User is authenticated (verified by middleware)
    const userId = (req.user as any)?.id;
    
    res.json({
      message: "Dashboard stats retrieved",
      userId,
      stats: {
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalCustomers: 0
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard stats", error });
  }
});

// GET /api/v1/dashboard/overview - Get dashboard overview (PROTECTED)
DashboardRouter.get("/overview", authMiddleware, (req: AuthRequest, res) => {
  try {
    const userId = (req.user as any)?.id;
    
    res.json({
      message: "Dashboard overview retrieved",
      userId,
      overview: {
        lastUpdated: new Date(),
        recentOrders: [],
        topProducts: []
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard overview", error });
  }
});

// GET /api/v1/dashboard - Welcome endpoint (PUBLIC)
DashboardRouter.get("/", (req: any, res: Response) => {
  res.json({ message: "Welcome to the Dashboard API!" });
});

export default DashboardRouter;