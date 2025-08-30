import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import catchAsync from "../../utils/catchAsync"; 
import sendResponse from "../../utils/sendResponse"; 
import { ParcelService } from "./parcel.service";
 import  { decodedToken } from "../../utils/decodeToken";
import AppError from "../../../errorHelpers/appError";
import { JwtPayload } from "jsonwebtoken";
 
 

// Create parcel
const createParcel = catchAsync(async (req: Request, res: Response) => {
  // Ensure logged-in user
  const user = req.user as JwtPayload;
  if (!user || !user._id) {
    throw new AppError("Unauthorized: No user found", httpStatus.UNAUTHORIZED);
  }

  // Call Service
  const parcel = await ParcelService.createParcel(req.body, user._id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Parcel created successfully",
    data: parcel,
  });
});


// Get all parcels (Admin only)
const getAllParcels = catchAsync(async (req: Request, res: Response) => {
  const filters = {
    status: req.query.status as string,
    isCancelled: req.query.isCancelled ? req.query.isCancelled === 'true' : undefined,
    isDelivered: req.query.isDelivered ? req.query.isDelivered === 'true' : undefined,
    isBlocked: req.query.isBlocked ? req.query.isBlocked === 'true' : undefined,
  };

  const parcels = await ParcelService.getAllParcels(filters);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcels retrieved successfully",
    data: parcels,
  });
});

// Get my parcels (Sender)
export const getMyParcels = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   
  if (!req.user) {
    throw new AppError('Unauthorized: User data not found.',httpStatus.UNAUTHORIZED, );
  }
  
   
  const senderId = req.user.id;

  const parcels = await ParcelService.getMyParcels(senderId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Your parcels retrieved successfully',
    data: parcels,
  });
});
 
const getIncomingParcels = catchAsync(async (req: Request, res: Response) => {
  
  const user = req.user; 
  if (!user) {
    throw new AppError("Unauthorized: No user found", httpStatus.UNAUTHORIZED);
  }

   
  const parcels = await ParcelService.getIncomingParcels(user._id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Incoming parcels retrieved successfully",
    data: parcels,
  });
});


// Get single parcel
const getSingleParcel = catchAsync(async (req: Request, res: Response) => {
   
  if (!req.user) {
    throw new AppError("Unauthorized: No user found",httpStatus.UNAUTHORIZED );
  }

  const parcel = await ParcelService.getSingleParcel(req.params.id, req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcel retrieved successfully",
    data: parcel,
  });
});


 
const cancelParcel = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new AppError("Unauthorized: No user found", httpStatus.UNAUTHORIZED);
  }

  const parcel = await ParcelService.cancelParcel(req.params.id, user._id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcel cancelled successfully",
    data: parcel,
  });
});


// Update parcel status (Admin only)
const updateParcelStatus = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new AppError("Unauthorized: No user found", httpStatus.UNAUTHORIZED);
  }

  const parcel = await ParcelService.updateParcelStatus(
    req.params.id,
    req.body,
    user._id    
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcel status updated successfully",
    data: parcel,
  });
});


// Delete parcel (Admin only)
const deleteParcel = catchAsync(async (req: Request, res: Response) => {
  const parcel = await ParcelService.deleteParcel(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcel deleted successfully",
    data: parcel,
  });
});
// Confirm delivery (Receiver only)
const confirmDelivery = catchAsync(async (req: Request, res: Response) => {
  const user = req.user; // Assuming your authentication middleware attaches the user to the request
  if (!user) {
    throw new AppError("Unauthorized: No user found", httpStatus.UNAUTHORIZED);
  }

  const { id } = req.params;
  const receiverId = user._id;

  const parcel = await ParcelService.confirmDelivery(id, receiverId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcel delivery confirmed successfully",
    data: parcel,
  });
});



 
export const ParcelController = {
  createParcel,
  getAllParcels,
  getMyParcels,
    getIncomingParcels,
  getSingleParcel,
  cancelParcel,
  updateParcelStatus,
  deleteParcel,
  confirmDelivery

};
 

 
