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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCustomerService = void 0;
class BlockCustomerService {
    constructor(blockCustomerRepository) {
        this.blockCustomerRepository = blockCustomerRepository;
        this.blockCustomerRepository = blockCustomerRepository;
    }
    getUserDetailById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockCustomerRepository.getUserDetailById(userId);
        });
    }
    getBlockedCustomer(helperId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockCustomerRepository.getBlockedCustomer(parseInt(helperId), parseInt(customerId));
        });
    }
    getCustomerWorkedWithHelper(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            let customer = [];
            const serviceRequest = yield this.blockCustomerRepository.getCustomerWorkedWithHelper(helperId);
            if (serviceRequest) {
                if (serviceRequest.length > 0) {
                    for (let sr in serviceRequest) {
                        const user = yield this.blockCustomerRepository.getUserDetailById(serviceRequest[sr].UserId);
                        if (user) {
                            customer.push({
                                Name: user.FirstName + " " + user.LastName,
                                UserId: user.UserId
                            });
                        }
                    }
                }
            }
            const userIds = customer.map(o => o.UserId);
            const filterArray = customer.filter(({ UserId }, index) => !userIds.includes(UserId, index + 1));
            return filterArray;
        });
    }
    ;
    updateBlockedCustomer(helperId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockCustomerRepository.updateBlockedCustomer(parseInt(helperId), parseInt(customerId));
        });
    }
    updateUnBlockedCustomer(helperId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockCustomerRepository.updateUnBlockedCustomer(parseInt(helperId), parseInt(customerId));
        });
    }
    createBlockUnblockCustomer(blockCustomer) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockCustomerRepository.createBlockUnblockCustomer(blockCustomer);
        });
    }
    hasHelperWorkedForCustomer(helperId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            let matched = false;
            const customerIntId = parseInt(customerId);
            let customers = yield this.getCustomerWorkedWithHelper(parseInt(helperId));
            if (customers) {
                for (let cs in customers) {
                    if (customers[cs].UserId === customerIntId) {
                        matched = true;
                        break;
                    }
                    else {
                        matched = false;
                    }
                }
            }
            else {
                matched = false;
            }
            return matched;
        });
    }
}
exports.BlockCustomerService = BlockCustomerService;
