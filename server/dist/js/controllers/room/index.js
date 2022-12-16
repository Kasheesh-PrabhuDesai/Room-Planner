"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.updateRoom = exports.addRoom = exports.getRooms = void 0;
const room_1 = __importDefault(require("../../models/room"));
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield room_1.default.find();
        res.status(200).json({ rooms });
    }
    catch (error) {
        throw error;
    }
});
exports.getRooms = getRooms;
const addRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const room = new room_1.default({
            name: body.name,
            description: body.description,
            status: body.status,
            numberOfDesks: body.numberOfDesks
        });
        const newRoom = yield room.save();
        const allRooms = yield room_1.default.find();
        res
            .status(201)
            .json({ message: "Room has been created!", room: newRoom, rooms: allRooms });
    }
    catch (error) {
        throw error;
    }
});
exports.addRoom = addRoom;
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateRoom = yield room_1.default.findByIdAndUpdate({ _id: id }, body);
        const allRooms = yield room_1.default.find();
        res.status(200).json({
            message: "Room has been updated",
            room: updateRoom,
            rooms: allRooms,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateRoom = updateRoom;
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedRoom = yield room_1.default.findByIdAndRemove(req.params.id);
        const allRooms = yield room_1.default.find();
        res.status(200).json({
            message: "Room has been deleted",
            room: deletedRoom,
            rooms: allRooms,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteRoom = deleteRoom;
